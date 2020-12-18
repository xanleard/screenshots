import{Nav} from '@fluentui/react';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import { Estudiante } from '../../Containers/estudiante';
import { Curso } from '../../Containers/curso';
import { Profesor } from '../../Containers/profesor';
import { Materia } from '../../Containers/materia';
import { Pais } from '../../Containers/pais';
import { Usuario } from '../../Containers/usuario';
import { Header } from '../Header';
import './container.css'
export const ContainerMain = () =>{
    const handleNavClick = () => {

    }
    return(
        <div className= "container">
            <Header />
            <Nav
                onLinkClick={handleNavClick}
                selectedKey="key3"
                ariaLabel="Nav basic example"
                styles={{
                    root:{
                        width:210,
                        height:'100%',
                        boxSizing:'border-box',
                        border:'1px solid #eee',
                        overflow:'auto',
                    },
                }}
                groups={[{
                    links:[{
                        name:'Estudiantes',
                        url:'/estudiantes',
                        icon:'UserFollowed',
                        key:'estudiantesNav',
                    },
                    {
                        name:'Cursos',
                        url:'/cursos',
                        icon:'News',
                        key:'CursosNav',

                    },{
                        name:'Profesores',
                        url:'/Profesores',
                        icon:'News',
                        key:'ProfesoresNav',

                    },{
                        name:'Paises',
                        url:'/Paises',
                        icon:'News',
                        key:'PaisesNav',

                    },{
                        name:'Usuarios',
                        url:'/Usuarios',
                        icon:'News',
                        key:'UsuariosNav',

                    },{
                        name:'Materias',
                        url:'/Materias',
                        icon:'News',
                        key:'MateriasNav',

                    },]
                }]}
            
            
            />

            <Router>
                <Switch>
                    <Route  path="/estudiantes" component={Estudiante}/>
                    <Route  path="/cursos" component={Curso}/>
                    <Route  path="/profesores" component={Profesor}/>
                    <Route  path="/paises" component={Pais}/>
                    <Route  path="/usuarios" component={Usuario}/>
                    <Route  path="/materias" component={Materia}/>
                </Switch>
            </Router>
        </div>
    )
}