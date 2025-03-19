from sqlalchemy import Column, Integer, String, ForeignKey, JSON
from sqlalchemy.orm import relationship
from database import Base


class Type(Base):
    __tablename__ = "types"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)


class Property(Base):
    __tablename__ = "properties"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)


class PossibleValue(Base):
    __tablename__ = "possible_values"
    id = Column(Integer, primary_key=True, index=True)
    property_name = Column(String, ForeignKey("properties.name"), index=True)
    value = Column(String)
    property = relationship("Property")


class TypeProperty(Base):
    __tablename__ = "type_properties"
    id = Column(Integer, primary_key=True, index=True)
    type_name = Column(String, ForeignKey("types.name"), index=True)
    property_name = Column(String, ForeignKey("properties.name"), index=True)
    type = relationship("Type")
    property = relationship("Property")


class PropertyValue(Base):
    __tablename__ = "property_values"
    id = Column(Integer, primary_key=True, index=True)
    type_name = Column(String, ForeignKey("types.name"), index=True)
    property_name = Column(String, ForeignKey("properties.name"), index=True)
    values = Column(JSON)
    type = relationship("Type")
    property = relationship("Property")
