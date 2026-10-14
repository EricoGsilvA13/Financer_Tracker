from pydantic import BaseModel, ConfigDict

class MessageModel(BaseModel):
    message: str

    model_config = ConfigDict(from_attributes=True)