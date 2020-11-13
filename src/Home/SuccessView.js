import '../App.css';

export default function SuccessView(props) {
    let userId = props.userId;

    return (
        <div
            className="fill"
            style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                fontWeight: "bold",
                color: "#333333",
                paddingTop: "20px",
                paddingBottom: "20px"
            }}>

            <span
                style={{
                    fontSize: "50px"
                }}>🥳🎉</span>
            <br />
            Login successful
            <br />
            <br />
            Your user ID is<br />{userId}
            <br /><br /><br />
            ------------------------------------
            <br /><br /><br />
            <a href="https://github.com/supertokens/supertokens-demo-react" target="_blank">View the code on GitHub</a>
        </div>
    );
}