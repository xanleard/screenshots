import React, { useEffect, useState } from 'react';

import { Dropdown, PrimaryButton, ProgressIndicator, TextField } from '@fluentui/react';
import { restClient } from '../../Services/restClient';

export const MateriaForm = ({ fetchMaterias, materiaSeleccionado, acccion, onDismiss }) => {
    const [materia, setMateria] = useState({
        id: acccion === 'Edit' ? materiaSeleccionado.id : 0,
        nombre: acccion === 'Edit' ? materiaSeleccionado.nombre : '',
        cursoId: acccion === 'Edit' ? materiaSeleccionado.cursoId : 0,      
    });

    const [mensajeValidacion, setMensajeValidacion] = useState('');
    const [errorCampo, setErrorCampo] = useState({
        nombre: '',
        cursoId: ''
    });
    
    const [cursos, setCursos] = useState([]);
    const [showSpinner, setShowSpinner] = useState(false);

    useEffect(() => {
        const fetchCursos = async () => {
            const response = await restClient.httpGet('/curso');

            if (response && response.length) {
                setCursos(response.map(curso => ({
                    key: curso.id,
                    text: curso.nombre
                })))
            }
        }

        fetchCursos();
    }, []);



    const handleTextFieldChange = prop => (event, value) => {
        setMateria({ ...materia, [prop]: value })
    }

    const handleSelectedCursoChange = (event, option) => {
        setMateria({ ...materia, cursoId: option.key });
    }
    const validandoCampos = () => {
        let mensaje = {};

        if (!materia.nombre) {
            mensaje = { ...mensaje, nombre: 'Ingrese nombre' };
        }

        setErrorCampo(mensaje);

        return Object.keys(mensaje).length;
    }

    const handleGuardarClick = async () => {
        if (validandoCampos()) {
            return;
        }

        setShowSpinner(true); //activar spinner

        const response = await restClient.httpPost('/MateriasCubrir', materia);

        if (typeof response === 'string') {
            setMensajeValidacion(response);
        }

        if (typeof response == "object") {
            setMensajeValidacion('Saved');

            fetchMaterias();
        }

        setShowSpinner(false);
        onDismiss();
    }

    const handleEditarClick = async () => {
        if (validandoCampos()) {
            return;
        }

        setShowSpinner(true);

        const url = `/MateriasCubrir/${materiaSeleccionado.id}`;

        const response = await restClient.httpPut(url, materia);

        if (response === 'success') {
            setMensajeValidacion('Saved');

            fetchMaterias();
        } else {
            setMensajeValidacion(response);
        }

        setShowSpinner(false);
        onDismiss();
    }

    return (
        <div>

            {showSpinner && <ProgressIndicator label="Guardando..." />}

            <TextField label="Nombre"
                value={materia.nombre}
                onChange={handleTextFieldChange('nombre')}
                errorMessage={errorCampo.nombre} />

            <Dropdown label="Seleccione un curso"
                    options={cursos}
                    selectedKey={materia.cursoId}
                    onChange={handleSelectedCursoChange}
                    errorMessage={errorCampo.cursoId} />
            <br />

            <PrimaryButton text="Guardar" onClick={acccion === 'New' ? handleGuardarClick : handleEditarClick} />

            <br />

            <span style={{ color: mensajeValidacion === 'Saved' ? 'green' : 'red' }}>{mensajeValidacion}</span>
        </div>
    )


}