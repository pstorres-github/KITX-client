import React, { useState, useEffect } from "react"

import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl'

const useStyles = makeStyles({
    headerCell: {
      color: 'blue',
      fontWeight: 'bold',
    },
    formControl: {
        minWidth: 180,
    }
  });

const FormUpdateModule = ({ courseID, modules, refreshModal }) => {
        
        console.log("modules", modules)
        const classes = useStyles();
        
       
        const validationSchema = yup.object({
            moduleNumber: yup
                .string('Enter module number'),
            description: yup
                .string('Enter module description'),
         })
    
        const initialValues = {
            moduleNumber: "",
            description: ""
        }
    
        /* formik object to define intial values.  If the values do not match the validation Schema, form items will not be submitted */
        let formik = useFormik({
            initialValues: initialValues,
            validationSchema: validationSchema,
            onSubmit(values) {
                let moduleToUpdate = {
                    moduleNumber: values.moduleNumber,
                    description: values.description
                }
                const updateModuleOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(moduleToUpdate, null, 2)
                };
                fetch(`/courses/${courseID}/module/description`, updateModuleOptions)
                    .then(response => response.json())
            refreshModal()
        }
            
        });
    
    
    if (!modules)
        return null


    return (
    
        <form className={classes.root} onSubmit={formik.handleSubmit}>    
        
        <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="module-drop-down">Module Number</InputLabel>
        <Select
          labelId="moduleNumber-label"
          label="Module Number"
          id="moduleNumber"
          name = "moduleNumber"
          variant = "filled"
          onChange={formik.handleChange}
          error={formik.touched.moduleNumber && Boolean(formik.errors.moduleNumber)}
          helperText={formik.touched.moduleNumber && formik.errors.moduleNumber}
        >

             {modules.map((module) => { return <MenuItem value={module.moduleNumber}>{module.moduleNumber}</MenuItem>})}

        </Select>
        </FormControl>

            <TextField
                fullWidth
                id="moduleDescription"
                name="description"
                label="Module Description"
                defaultValue=""
                variant="filled"
                style={{ margin: "0px 16px 16px", width:"70%" }}
                onChange={formik.handleChange}
                error={formik.touched.courseName && Boolean(formik.errors.courseName)}
                helperText={formik.touched.courseName && formik.errors.courseName}
            />


            <Button color="primary" variant="contained" type="submit">
                Submit
            </Button>
        
        </form>
    ) 


}

export default FormUpdateModule