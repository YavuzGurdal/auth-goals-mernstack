import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import GoalForm from '../components/GoalForm'
import GoalItem from '../components/GoalItem'
import Spinner from '../components/Spinner'
import { getGoals, reset } from '../features/goals/goalSlice'


function Dashboard() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth) // store'daki state'den cekiyorum

    const { goals, isError, isLoading, message } = useSelector((state) => state.goals) // store'daki state'den cekiyorum

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        if (!user) {
            navigate('/login')
        }

        // if (user) {
        //    dispatch(getGoals()) // getGoals() fonksiyonunu calistiriyorum
        // }

        dispatch(getGoals()) // getGoals() fonksiyonunu calistiriyorum

        /*
        componentWillUnmount islevini kullanmak icin, useEffect’in icerisinde return etmesi icin fazladan bir fonksiyon daha yazacagiz. Return ettigi fonksiyonun icerisinde component’in yasam dongusu sonlandiginda baslayacak olan islemleri tetikleyebiliriz. Bu genelde, app’ten temizlenmesi gereken degerler soz konusu oldugunda basvurulan bir yontem olarak one cikar.
        */
        return () => {
            dispatch(reset())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, navigate, dispatch])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className="heading">
                <h1>Welcome {user && user.name}</h1>
                <p>Goals Dashboard</p>
            </section>

            <GoalForm />

            <section className="content">
                {
                    goals.length > 0 ?
                        (
                            <div className="goals">
                                {
                                    goals.map((goal) => (
                                        <GoalItem key={goal._id} goal={goal} />
                                    ))
                                }
                            </div>
                        )
                        :
                        (<h3>You have not set any goal</h3>)
                }
            </section>
        </>
    )
}

export default Dashboard