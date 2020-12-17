import React, { useEffect, useState } from 'react';

import { Dropdown, PrimaryButton, ProgressIndicator, TextField } from '@fluentui/react';
import { restClient } from '../../Services/restClient';

export const profesorForm = ({ fetchProfesores, profesorSeleccionado, acccion, onDismiss }) => {
    const [profesor, setProfesor] = useState({
        id: acccion === 'Edit' ? profesorSeleccionado.id : 0,
        nombre: acccion === 'Edit' ? profesorSeleccionado.nombre : '',      
    });

    const [mensajeValidacion, setMensajeValidacion] = useState('');
    const [errorCampo, setErrorCampo] = useState({
        nombre: ''
    });
    const [showSpinner, setShowSpinner] = useState(false);

    const handleTextFieldChange = prop => (event, value) => {
        setProfesor({ ...profesor, [prop]: value })
    }

    const validandoCampos = () => {
        let mensaje = {};

        if (!profesor.nombre) {
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

        const response = await restClient.httpPost('/Profesor', profesor);

        if (typeof response === 'string') {
            setMensajeValidacion(response);
        }

        if (typeof response == "object") {
            setMensajeValidacion('Saved');

            fetchProfesores();
        }

        setShowSpinner(false);
        onDismiss();
    }

    const handleEditarClick = async () => {
        if (validandoCampos()) {
            return;
        }

        setShowSpinner(true);

        const url = `/Profesor/${profesorSeleccionado.id}`;

        const response = await restClient.httpPut(url, profesor);

        if (response === 'success') {
            setMensajeValidacion('Saved');

            fetchProfesores();
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
                value={profesor.nombre}
                onChange={handleTextFieldChange('nombre')}
                errorMessage={errorCampo.nombre} />
          
            <br />

            <PrimaryButton text="Guardar" onClick={acccion === 'New' ? handleGuardarClick : handleEditarClick} />

            <br />

            <span style={{ color: mensajeValidacion === 'Saved' ? 'green' : 'red' }}>{mensajeValidacion}</span>
        </div>
    )


}