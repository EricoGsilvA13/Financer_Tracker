from pydantic import BaseModel, ConfigDict
from decimal import Decimal

class MessageModel(BaseModel):
    message: str

    model_config = ConfigDict(from_attributes=True)

class TotalSchemaResponse(BaseModel):
    total: Decimal

    model_config = ConfigDict(from_attributes=True)