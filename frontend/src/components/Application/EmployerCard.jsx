
const EmployerCard = (props)=>{

    const {application, openModal} = props

    return (
        <div className="job_seeker_card">
            <div className="detail">
                <p>
                    <span>Name:</span>
                    {application.name}
                </p>
                <p>
                    <span>Email:</span>
                    {application.email}
                </p>
                <p>
                    <span>Phone:</span>
                    {application.phone}
                </p>
                <p>
                    <span>Address:</span>
                    {application.address}
                </p>
                <p>
                    <span>Cover Letter:</span>
                    {application.coverLetter}
                </p>
            </div>
            <div className="resume">
                <img src= {application.resume.url} alt = "resume" onClick={()=>{openModal(application.resume.url)}} />
            </div>
        </div>
    
    )

}

export default EmployerCard