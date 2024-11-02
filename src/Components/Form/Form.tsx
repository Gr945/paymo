import { FormControl, Typography, Grid, Input as muiInput, styled, FormLabel, Button, Dialog } from '@mui/material';
import './Form.css';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { FormHelperText } from '../FormHelperText/FormHelperText';
import { useEffect, useState } from 'react';

type Inputs = {
    number: string,
    time: string,
    cvv: string,
    sum: string,
    name: string,
    message: string
}

const Input = styled(muiInput)(() => ({
    borderRadius: '12px',
    border: '1px solid #c7cbe033',
    padding: '14px 16px',
    fontSize: '1rem',
    marginTop: '5px !important',
    '&:focus': {
        outline: 'none',
        borderBottom: 'none'
    },
    '&::before': {
        borderBottom: 'none',
    },
    '& input': {
        padding: '0',
    },
    '&::hover': {
        borderBottom: 'none'
    },

}));

function Form() {
    const navigate = useNavigate();
    const name = 'Владимир В';
    const tema = 'Поход';
    const [err, setErr] = useState<any>({})
    const [openModal, setOpenModal] = useState(false)
    const [displayCvv, setDisplayCvv] = useState('');

    const initialValues = {
        number: '',
        time: '',
        cvv: '',
        sum: '',
        name: '',
        message: 'Поход'
    } as Inputs;

    const validateForm = () => (values: { number: string; time: string; cvv: string; sum: string; name: string; message: string }) => {
        const errors: Partial<{ number: string; time: string; cvv: string; sum: string, name: string; message: string }> = {};
        const pattern = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
        if (!values.number || typeof (+values.number) !== 'number' || values.number.toString().length !== 16) {
            errors.number = 'Введите 16 цифр с карты'
        }

        if (!values.cvv || typeof (+values.cvv) !== 'number' || values.cvv.length > 3) {
            errors.cvv = 'Введите 3 цифры с обратной стороны карты'
        }

        if (!values.sum || typeof (+values.sum) !== 'number' || +values.number < 10) {
            errors.sum = 'Введите сумму не менее 10'
        }

        if (!values.name) {
            errors.name = 'Введите ваше имя'
        }

        if (!values.time || !pattern.test(values.time)) {
            errors.time = 'Введите дату в правильном формате MM/ГГ'
        }
        return errors;
    };

    const validate = validateForm();

    const formik = useFormik({
        initialValues,
        validateOnMount: true,
        isInitialValid: false,
        validate,
        onSubmit: () => {
            setOpenModal(true);
            setTimeout(() => {
                setOpenModal(false)
            },3000)
        },
    });

    const handleChangeCVV = (event: { target: { value: any; }; }) => {
        const value = event.target.value;
        setDisplayCvv('*'.repeat(value.length));
        formik.handleChange(event);
    };

    return (
        <Grid container flexDirection='column' sx={{
            width: '600px',
            height: '744px',
            padding: '32px',
            background: 'white',
            borderRadius: '20px'
        }}
        >
            <Typography children={`${name}. собирает на «${tema}»`} sx={{ fontSize: '23px', fontWeight: 500 }} />

            <Grid
                component="form"
                autoComplete="off"
                onSubmit={formik.handleSubmit}
                mt={'20px'}
                gap={1}
                sx={{ display: 'flex', flexDirection: 'column' }}
            >
                <FormControl >
                    <FormLabel >Номер карты </FormLabel>
                    <Input
                        id="number"
                        name="number"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.number}
                        sx={{ border: `1px solid ${err?.number ? 'red' : '#c7cbe033'}` }}
                    />
                    <FormHelperText error={formik.errors.number} touched={formik.touched.number} />
                </FormControl>
                <Grid container gap={1} flexWrap='nowrap'>
                    <FormControl >
                        <FormLabel>Срок действия</FormLabel>
                        <Input
                            id="time"
                            name="time"
                            type="string"
                            onChange={formik.handleChange}
                            value={formik.values.time}
                            placeholder='MM/ГГ'
                            sx={[err?.time && { border: '1px solid red' }]}
                        />
                        <FormHelperText error={formik.errors.time} touched={formik.touched.time} />
                    </FormControl>
                    <FormControl >
                        <FormLabel >CVV </FormLabel>
                        <Input
                            id="cvv"
                            name="cvv"
                            type="text"
                            onChange={handleChangeCVV}
                            value={displayCvv}
                            sx={[err?.cvv && { border: '1px solid red' }]}
                        />
                        <FormHelperText error={formik.errors.cvv} touched={formik.touched.cvv} />
                    </FormControl>
                </Grid>
                <FormControl>
                    <FormLabel >Сумма перевода </FormLabel>
                    <Input
                        id="sum"
                        name="sum"
                        type="text"
                        onChange={formik.handleChange}
                        placeholder=' ₽'
                        value={formik.values.sum}
                        sx={[err?.sum && { border: '1px solid red' }, { '& input': { width: 'maxContent' } }]}
                        endAdornment={formik.values.sum.length > 0 && <span>{' ₽'}</span>}
                    />
                    <FormHelperText error={formik.errors.sum} touched={formik.touched.sum} />
                </FormControl>

                <FormControl>
                    <FormLabel >Ваше имя</FormLabel>
                    <Input
                        id='name'
                        name="name"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        sx={[err?.name && { border: '1px solid red' }]}
                    />
                    <FormHelperText error={formik.errors.name} touched={formik.touched.name} />
                </FormControl>

                <FormControl>
                    <FormLabel>Сообщение получателю</FormLabel>
                    <Input
                        id="message"
                        name="message"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.message}
                        sx={[err?.message && { border: '1px solid red' }]}
                    />
                    <FormHelperText error={formik.errors.message} touched={formik.touched.message} />
                </FormControl>

                <Grid container gap={1} flexWrap='nowrap'>
                    <Button sx={{ width: '131px', height: '51px', borderRadius: '12px', }} type="submit" variant="contained"
                        onClick={() => { setErr(formik?.errors) }} >
                        Перевести
                    </Button>
                    <Button sx={{ width: '131px', height: '51px', borderRadius: '12px', }} variant="outlined" onClick={() => navigate(-1)}>
                        Вернуться
                    </Button>
                </Grid>

            </Grid>

            <Dialog open={openModal} onClose={setOpenModal}>
                <Grid gap='20px' container flexDirection='column' position='relative' alignItems='center' justifyContent='center' sx={{ padding: '40px', borderRadius: '16px' }}>
                    <Typography children='Ваши средства отправлены! Спасибо!' variant='body2' sx={{ color: 'green', fontSize: '22px' }} />
                </Grid>
            </Dialog>
        </Grid>
    );
}

export default Form;