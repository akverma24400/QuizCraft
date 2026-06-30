import json


def clean_json(response: str):

    response = response.replace(
        "```json",
        ""
    )

    response = response.replace(
        "```",
        ""
    )

    response = response.strip()

    return json.loads(response)