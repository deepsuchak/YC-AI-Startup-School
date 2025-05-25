from langgraph.graph import MessagesState


class PhilosopherState(MessagesState):
    """State class for the LangGraph workflow. It keeps track of the information necessary to maintain a coherent
    conversation between the Tech Leader and the user.

    Attributes:
        philosopher_context (str): The professional and technical background of the tech leader.
        philosopher_name (str): The name of the tech leader.
        philosopher_perspective (str): The perspective of the tech leader about AI and technology.
        philosopher_style (str): The communication and leadership style of the tech leader.
        summary (str): A summary of the conversation. This is used to reduce the token usage of the model.
    """

    philosopher_context: str
    philosopher_name: str
    philosopher_perspective: str
    philosopher_style: str
    summary: str


def state_to_str(state: PhilosopherState) -> str:
    if "summary" in state and bool(state["summary"]):
        conversation = state["summary"]
    elif "messages" in state and bool(state["messages"]):
        conversation = state["messages"]
    else:
        conversation = ""

    return f"""
PhilosopherState(philosopher_context={state["philosopher_context"]}, 
philosopher_name={state["philosopher_name"]}, 
philosopher_perspective={state["philosopher_perspective"]}, 
philosopher_style={state["philosopher_style"]}, 
conversation={conversation})
        """
