"""Terminal chat with the study-room desk assistant.

Run it with:
    uv run --env-file lmstudio.env python chat.py
"""
import os
import uuid

from pydantic_ai import Agent
from pydantic_ai.exceptions import AgentRunError
from pydantic_ai.models.openai import OpenAIChatModel
from pydantic_ai.providers.openai import OpenAIProvider


model = OpenAIChatModel(
    os.environ["LLM_MODEL"],
    provider=OpenAIProvider(
        base_url=os.environ["LLM_BASE_URL"],
        api_key=os.environ["LLM_API_KEY"],
    ),
)

agent = Agent(
    model,
    instructions=(
        "You are the assistant at the library study-room desk. "
        "Answer questions about studying and study rooms clearly and helpfully. "
        "Keep every answer to at most three sentences."
    ),
)


def main():
    history = None
    session_id = uuid.uuid4().hex

    print("Study-room desk. Type /new for a new conversation and /quit to leave.")

    while True:
        try:
            text = input("you> ")
        except EOFError:
            break

        if text == "/quit":
            break
        if text == "/new":
            history = None
            session_id = uuid.uuid4().hex
            print("New conversation.")
            continue
        if not text.strip():
            continue

        try:
            result = agent.run_sync(
                text,
                message_history=history,
                model_settings={
                    "extra_headers": {"X-Session-ID": session_id},
                },
            )
        except AgentRunError as exc:
            print(f"desk> {exc}")
            continue

        print(f"desk> {result.output}")
        history = result.all_messages()


if __name__ == "__main__":
    main()
