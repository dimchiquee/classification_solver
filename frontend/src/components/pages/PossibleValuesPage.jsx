import React, { useState, useEffect } from 'react';
import * as api from '../../services/api';

const PossibleValuesPage = () => {
  const [properties, setProperties] = useState([]);
  const [possibleValues, setPossibleValues] = useState({});
  const [selectedProperty, setSelectedProperty] = useState('');
  const [newValue, setNewValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await api.getProperties();
        setProperties(data);
        if (data.length > 0) {
          setSelectedProperty(data[0].name);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

      useEffect(() => {
    const fetchValues = async () => {
      if (selectedProperty) {
        try {
          const data = await api.getPossibleValues(selectedProperty);
          const values = {};
          data.forEach(item => {
            if (!values[item.property_name]) {
              values[item.property_name] = [];
            }
            values[item.property_name].push(item.value);
          });
          setPossibleValues(values);
        } catch (error) {
          setError(error.message);
        }
      }
    };
    fetchValues();
  }, [selectedProperty]);

  const handleAddPossibleValue = async () => {
    if (newValue.trim() === '' || !selectedProperty) {
        setError("Выберите свойство и введите значение!");
        return;
    }
    try {
      await api.createPossibleValue(selectedProperty, { value: newValue });
      setPossibleValues(prevValues => ({
        ...prevValues,
        [selectedProperty]: [...(prevValues[selectedProperty] || []), newValue]
      }));
      setNewValue('');
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeletePossibleValue = async (value) => {
    try {
      await api.deletePossibleValue(selectedProperty, value);
      setPossibleValues(prevValues => ({
        ...prevValues,
        [selectedProperty]: prevValues[selectedProperty].filter(v => v !== value)
      }));
       setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      <h2>Возможные значения</h2>

        {error && <div style={{color: 'red'}}>{error}</div>}

      <select value={selectedProperty} onChange={(e) => setSelectedProperty(e.target.value)}>
        {properties.map((property) => (
          <option key={property.id} value={property.name}>
            {property.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={newValue}
        onChange={(e) => setNewValue(e.target.value)}
        placeholder="Введите новое значение"
      />
      <button onClick={handleAddPossibleValue}>Добавить</button>

      {selectedProperty && (
        <ul>
          {possibleValues[selectedProperty]?.map((value, index) => (
            <li key={index}>
              {value}
              <button className="delete-btn" onClick={() => handleDeletePossibleValue(value)}> - </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PossibleValuesPage;