import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData // state'i destructuring yaptik

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())

    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({ // bu sekilde bir defa yazarak hallediyoruz
            ...prevState,
            [e.target.name]: e.target.value
            // key'i e.target.name den aliyoruz. value'yu e.target.value'dan aliyoruz
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password,
        }

        dispatch(login(userData))
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Login and start setting goals</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="email" className="form-control" id='email' name='email' value={email} placeholder='Enter your Email'
                            onChange={onChange}
                            autoComplete="off"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password" className="form-control" id='password' name='password' value={password} placeholder='Enter Password'
                            onChange={onChange}
                            autoComplete="off"
                        />
                    </div>
                    <div className="form-group">
                        <button type='submit' className="btn btn-block">
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login