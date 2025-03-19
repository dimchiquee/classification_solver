from pydantic import BaseModel
from typing import List

class TypeBase(BaseModel):
    name: str

class TypeCreate(TypeBase):
    pass

class TypeUpdate(TypeBase):
    pass

class TypeOut(TypeBase):
    id: int
    class Config:
        orm_mode = True


class PropertyBase(BaseModel):
    name: str

class PropertyCreate(PropertyBase):
   pass

class PropertyUpdate(PropertyBase):
    pass

class PropertyOut(PropertyBase):
    id: int
    class Config:
        orm_mode = True

class PossibleValueBase(BaseModel):
    value: str

class PossibleValueCreate(PossibleValueBase):
  pass

class PossibleValueOut(PossibleValueBase):
    id: int
    property_name: str
    class Config:
        orm_mode = True


class TypePropertyBase(BaseModel):
    property_name: str

class TypePropertyCreate(TypePropertyBase):
    pass

class TypePropertyOut(BaseModel):
    id: int
    type_name: str
    property_name: str
    class Config:
        orm_mode = True

class PropertyValueBase(BaseModel):
    values: List[str]

class PropertyValueCreate(PropertyValueBase):
    pass

class PropertyValueOut(PropertyValueBase):
    id: int
    type_name: str
    property_name: str
    class Config:
        orm_mode = True