const Notification = ({message, errorMessage}) => {
    // if(message === null) {
    //     return null
    // }
    // if(errorMessage === null) {
    //     return null
    // }

    if(message) {
        return (
            <div className="success">
                {message}
            </div>
        )
    }
    if(errorMessage) {
        return (
            <div className="error">
                {errorMessage}
            </div>
        )
    }
}

export default Notification