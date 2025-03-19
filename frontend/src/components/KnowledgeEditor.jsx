import React, { useState } from 'react';
import TypeForm from './TypeForm';
import PropertyForm from './PropertyForm';
import PossibleValuesForm from './PossibleValuesForm';
import TypePropertyForm from './TypePropertyForm';
import PropertyValueForm from './PropertyValueForm';
import CompletenessCheck from './CompletenessCheck';

const KnowledgeEditor = () => {
  const [types, setTypes] = useState();
  const [properties, setProperties] = useState();
  const [possibleValues, setPossibleValues] = useState();
  const [typeProperties, setTypeProperties] = useState();

  const [propertyValues, setPropertyValues] = useState();

  const handleAddType = (newType) => {
      setTypes([...types, newType]);
      setTypeProperties({...typeProperties, [newType]: []});
      setPropertyValues({...propertyValues, [newType]: {}});
  };
  const handleDeleteType = (typeToDelete) => {
    setTypes(types.filter(type => type !== typeToDelete));
    const {[typeToDelete]: _, ...restTypeProps} = typeProperties;
    setTypeProperties(restTypeProps);
    const {[typeToDelete]: __, ...restProps} = propertyValues;
    setPropertyValues(restProps);
  };

  const handleAddProperty = (newProperty) => {
    setProperties([...properties, newProperty]);
    setPossibleValues({...possibleValues, [newProperty]: []});

  };
  const handleDeleteProperty = (propertyToDelete) => {
    setProperties(properties.filter(prop => prop !== propertyToDelete));
    const {[propertyToDelete]: _, ...restPossibleValues} = possibleValues;
    setPossibleValues(restPossibleValues);

    const updatedTypeProperties = {};
    for (const type in typeProperties) {
      updatedTypeProperties[type] = typeProperties[type].filter(prop => prop !== propertyToDelete);
    }
    setTypeProperties(updatedTypeProperties);

    const updatedPropertyValues = {};
      for (const type in propertyValues) {
        const {[propertyToDelete]: deletedValue, ...restValues} = propertyValues[type];
        updatedPropertyValues[type] = restValues;
      }
      setPropertyValues(updatedPropertyValues);
  };

  const handleAddPossibleValue = (property, newValue) => {
    setPossibleValues({
      ...possibleValues,
      [property]: [...possibleValues[property], newValue]
    });
  };
  const handleDeletePossibleValue = (property, valueToDelete) => {
    setPossibleValues({
      ...possibleValues,
      [property]: possibleValues[property].filter(val => val !== valueToDelete)
    });
  };

 const handleAddTypeProperty = (type, property) => {
    if (!typeProperties[type].includes(property)) {
        setTypeProperties({
            ...typeProperties,
            [type]: [...typeProperties[type], property]
        });
    }
};
  const handleDeleteTypeProperty = (type, property) => {
    setTypeProperties({
      ...typeProperties,
      [type]: typeProperties[type].filter(prop => prop !== property)
    });
  };

  const handleAddPropertyValue = (type, property, value) => {
     setPropertyValues({
        ...propertyValues,
        [type]: {
            ...propertyValues[type],
            [property]: [...(propertyValues[type][property] || []), value]
        }
    });
};

const handleDeletePropertyValue = (type, property, value) => {
    setPropertyValues({
        ...propertyValues,
        [type]: {
            ...propertyValues[type],
            [property]: propertyValues[type][property]?.filter(v => v !== value) || []
        }
    });
};

  return (
    <div>
      <TypeForm types={types} onAddType={handleAddType} onDeleteType={handleDeleteType} />
      <PropertyForm properties={properties} onAddProperty={handleAddProperty} onDeleteProperty={handleDeleteProperty} />
      <PossibleValuesForm properties={properties} possibleValues={possibleValues} onAddPossibleValue={handleAddPossibleValue} onDeletePossibleValue={handleDeletePossibleValue} />
      <TypePropertyForm types={types} properties={properties} typeProperties={typeProperties} onAddTypeProperty={handleAddTypeProperty} onDeleteTypeProperty={handleDeleteTypeProperty}/>
      <PropertyValueForm types={types} properties={properties} typeProperties={typeProperties} possibleValues={possibleValues} propertyValues={propertyValues} onAddPropertyValue={handleAddPropertyValue} onDeletePropertyValue={handleDeletePropertyValue}/>
      <CompletenessCheck types={types} properties={properties} possibleValues={possibleValues} typeProperties={typeProperties} propertyValues={propertyValues}/>
    </div>
  );
};

export default KnowledgeEditor;