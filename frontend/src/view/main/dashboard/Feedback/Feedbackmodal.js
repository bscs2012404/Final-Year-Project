import { Box, Button, Divider, FormHelperText, Modal, TextField, Typography } from '@mui/material'
import { Form, FormikProvider, useFormik } from 'formik'
import React from 'react'
import * as yup from "yup";
import MainCard from '../../../components/Card/MainCard';
import { Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useDispatch } from 'react-redux';
import { createFeedback } from '../../../../redux/feedback/feedbackActions';

const FeedBackModal = ({ open, handleClose }) => {
    const dispatch = useDispatch();
    const handleCreate = async(feedback) => {
        await dispatch(createFeedback(feedback));
    }

    const validationSchema = yup.object({
        subject: yup.string().max(50, 'Max character limit is 50').required("Team is required"),
        content: yup.string().max(200, 'Max character limit is 200').required("Name is required"),
    });

    const formik = useFormik({
        initialValues: {
            subject: "",
            content: '',
        },
        validationSchema,
        onSubmit: (values) => {
            handleClose()
            handleCreate(values)
            formik.resetForm()
        }
    })


    const {
        handleSubmit,
    } = formik;
    return (
        <Modal
            open={open}
            onClose={handleClose}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', outline: 0 }}
        >
            <Box p={2}  sx={{ display: 'flex', backgroundColor:'white', borderRadius:'12px' }}>
                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '450px', rowGap:  '20px'}}>
                            <Typography variant="h6" fontWeight={600}>Give Feedback</Typography>
                            <Divider />
                            <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                                <Input placeholder='Subject' name='subject'
                                    value={formik.values.subject}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    required
                                    error={
                                        formik.touched.subject &&
                                        Boolean(formik.errors.subject)
                                    }
                                />
                                {formik.touched.subject && formik.errors.subject && (
                                    <FormHelperText
                                        error
                                        id="standard-weight-helper-text-email-login"
                                    >
                                        {formik.errors.subject}
                                    </FormHelperText>
                                )}
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                                <Typography variant="body2" alignSelf={'flex-end'}>{formik.values.content.length}/200</Typography>
                                <TextArea placeholder='Description' name='content'
                                    value={formik.values.content}
                                    onChange={formik.handleChange}
                                    rows={4}
                                    required
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.content &&
                                        Boolean(formik.errors.content)
                                    }
                                />
                                {formik.touched.content && formik.errors.content && (
                                    <FormHelperText
                                        error
                                        id="standard-weight-helper-text-email-login"
                                    >
                                        {formik.errors.content}
                                    </FormHelperText>
                                )}
                            </Box>
                            <Divider />
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', columnGap: '10px' }}>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button variant="contained" type='submit'>Submit</Button>
                            </Box>
                        </Box>
                    </Form>
                </FormikProvider>
            </Box>
        </Modal>
    )
}

export default FeedBackModal