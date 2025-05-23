const Notification = ({message, errorMessage}) => {
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