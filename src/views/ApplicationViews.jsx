import Quiz from '../components/Quiz'


function ApplicationViews() {
   

    return (
        <>
        <div style={{margin: "0 auto"}}>
        <a href="/easyquiz"><button style={{width: "45vw", height: "auto", backgroundColor: "green"}}>Easy</button></a>
        <a href="/hardquiz"><button style={{width: "45vw", height: "auto", backgroundColor: "red"}}>Hard</button></a>
        </div>
        </>
    )
}

export default ApplicationViews
