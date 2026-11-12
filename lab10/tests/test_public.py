"""Public checks for Lab 10 (supplied). Run them with:  uv run pytest

They replace your model with a scripted one (Pydantic AI's FunctionModel) and type the conversation for you,
so they need neither LM Studio nor an API key. The marking runs more checks of the same kind.
"""
import os

os.environ.setdefault("LLM_BASE_URL", "http://127.0.0.1:1234/v1")
os.environ.setdefault("LLM_MODEL", "my-local-model")
os.environ.setdefault("LLM_API_KEY", "lm-studio")
os.environ.setdefault("PYDANTIC_AI_NO_BANNER", "1")

from pydantic_ai.exceptions import ModelHTTPError
from pydantic_ai.messages import ModelResponse, TextPart, UserPromptPart
from pydantic_ai.models.function import FunctionModel

import chat


def converse(monkeypatch, capsys, lines, model_function):
    """Type `lines` into chat.main() with a scripted model; return what it printed."""
    typed = iter(lines)
    monkeypatch.setattr("builtins.input", lambda prompt="": next(typed))
    with chat.agent.override(model=FunctionModel(model_function)):
        chat.main()
    return capsys.readouterr().out


def echo_prompts(messages, info):
    """The scripted model answers with every user message of the conversation it receives."""
    prompts = [part.content for message in messages for part in message.parts if isinstance(part, UserPromptPart)]
    return ModelResponse(parts=[TextPart(" / ".join(prompts))])


# Exercise 1 ---------------------------------------------------------------------------------------

def test_ex1_model_comes_from_the_environment():
    assert type(chat.agent.model).__name__ == "OpenAIChatModel"
    assert chat.agent.model.model_name == os.environ["LLM_MODEL"]
    assert str(chat.agent.model.client.base_url).rstrip("/") == os.environ["LLM_BASE_URL"].rstrip("/")
    assert chat.agent.model.client.api_key == os.environ["LLM_API_KEY"]


def test_ex1_the_agent_has_instructions():
    seen = {}

    def model(messages, info):
        seen["instructions"] = info.instructions
        return ModelResponse(parts=[TextPart("ok")])

    with chat.agent.override(model=FunctionModel(model)):
        chat.agent.run_sync("Hello")
    assert seen["instructions"]


def test_ex1_the_loop_prints_the_reply_until_quit(monkeypatch, capsys):
    out = converse(monkeypatch, capsys, ["Hello", "/quit"], lambda messages, info: ModelResponse(parts=[TextPart("Hi from the desk.")]))
    assert "Hi from the desk." in out


def test_ex1_the_loop_ends_at_end_of_input(monkeypatch, capsys):
    def lines():
        yield "Hello"
        raise EOFError

    typed = lines()
    monkeypatch.setattr("builtins.input", lambda prompt="": next(typed))
    with chat.agent.override(model=FunctionModel(lambda messages, info: ModelResponse(parts=[TextPart("Hi.")]))):
        chat.main()
    assert "Hi." in capsys.readouterr().out


# Exercise 2 ---------------------------------------------------------------------------------------

def test_ex2_the_conversation_is_remembered(monkeypatch, capsys):
    out = converse(monkeypatch, capsys, ["Room for 2?", "And on Friday?", "/quit"], echo_prompts)
    assert "Room for 2? / And on Friday?" in out


def test_ex2_new_starts_a_fresh_conversation(monkeypatch, capsys):
    out = converse(monkeypatch, capsys, ["one", "/new", "two", "/quit"], echo_prompts)
    assert "one / two" not in out
    assert out.count("two") >= 1


def test_ex2_a_model_error_does_not_end_the_chat(monkeypatch, capsys):
    calls = []

    def model(messages, info):
        calls.append(1)
        if len(calls) == 1:
            raise ModelHTTPError(status_code=503, model_name="scripted", body="model not loaded")
        return echo_prompts(messages, info)

    out = converse(monkeypatch, capsys, ["lost", "again", "/quit"], model)
    assert "desk> again" in out
    assert "lost / again" not in out


# Exercise 3 ---------------------------------------------------------------------------------------

def test_ex3_session_header_is_sent_and_changes_with_new(monkeypatch, capsys):
    seen = []

    def model(messages, info):
        seen.append(((info.model_settings or {}).get("extra_headers") or {}).get("X-Session-ID"))
        return ModelResponse(parts=[TextPart("ok")])

    converse(monkeypatch, capsys, ["a", "b", "/new", "c", "/quit"], model)
    assert len(seen) == 3 and all(seen)
    assert seen[0] == seen[1] != seen[2]
