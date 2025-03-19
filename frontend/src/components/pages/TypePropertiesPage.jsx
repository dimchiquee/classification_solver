import React, { useState, useEffect } from 'react';
import * as api from '../../services/api';

const TypePropertiesPage = () => {
    const [types, setTypes] = useState([]);
    const [properties, setProperties] = useState([]);
    const [typeProperties, setTypeProperties] = useState({});
    const [selectedType, setSelectedType] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const typesData = await api.getTypes();
                const propertiesData = await api.getProperties();
                setTypes(typesData);
                setProperties(propertiesData);

                if (typesData.length > 0) {
                    setSelectedType(typesData[0].id);
                }

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchTypeProperties = async () => {
            if (selectedType) {
                try {
                    const data = await api.getTypeProperties(selectedType);
                    setTypeProperties(prevTypeProperties => ({
                        ...prevTypeProperties,
                        [selectedType]: data
                    }));
                } catch (error) {
                    setError(error.message);
                }
            }
        };
        fetchTypeProperties();
    }, [selectedType]);

   const handleAddTypeProperty = async (property) => {
    try {
        await api.createTypeProperty(selectedType, property);
        setTypeProperties(prev => ({
            ...prev,
             [selectedType]: [...(prev[selectedType] || []), property]
        }));
        setError(null);
    } catch (error) {
        setError(error.message);
    }
    };

    const handleDeleteTypeProperty = async (property) => {
        try {
            await api.deleteTypeProperty(selectedType, property);
            setTypeProperties(prev => ({
                ...prev,
                [selectedType]: prev[selectedType] ? prev[selectedType].filter(p => p !== property) : []
            }));
            setError(null);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleCheckboxChange = (property) => {
        if (typeProperties[selectedType] && typeProperties[selectedType].includes(property)) {
          handleDeleteTypeProperty(property);
        }
         else {
            handleAddTypeProperty(property);
        }

    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    return (
        <div>
            <h2>Свойства для типов</h2>

            {error && <div style={{ color: 'red' }}>{error}</div>}

            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                {types.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                ))}
            </select>

            {selectedType && (
                <div>
                    <h3>Свойства для {types.find(type => type.id === parseInt(selectedType))?.name}:</h3>
                     {properties.map(property => {
                        const propertyName = property.name;
                        return (
                            <div key={propertyName}>
                                <input
                                    type="checkbox"
                                    id={`${selectedType}-${propertyName}`}
                                    checked={typeProperties[selectedType] ? typeProperties[selectedType].includes(propertyName) : false}
                                    onChange={() => handleCheckboxChange(propertyName)}
                                />
                                <label htmlFor={`${selectedType}-${propertyName}`}>{propertyName}</label>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default TypePropertiesPage;