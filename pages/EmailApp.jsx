import EmailList from '../js/apps/email/cmps/EmailList.jsx'
import emailService from '../js/apps/email/services/emailService.js'
import EmailSideBar from '../js/apps/email/cmps/EmailSideBar.jsx'
import eventBusService from '../services/eventBusService.js'
import EmailDetails from '../js/apps/email/pages/EmailDetails.jsx'
import EmailCompose from '../js/apps/email/cmps/EmailCompose.jsx'
const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
const { createBrowserHistory } = History
const history = createBrowserHistory()
export default class EmailApp extends React.Component {

    state = {
        emails: [],
        displayBar: true,
        isShowDetails: false,
        isMobile: false,
        sortBy: 'sentAt',
        filterBy: {
            subject: '',
            isRead: '',
            type: 'inbox'
        }
    }

    componentDidMount() {
        this.loadEmails();
        this.checkWindowWidth()
        this.onSendNote()
    }

    onSendNote=()=>{
        console.log(this.props.location.search)
    }

    checkWindowWidth = () => {
        if (window.innerWidth < 750) {
            this.setState({ isMobile: true })
        }
        window.addEventListener('resize', () => {

            this.setState({
                isMobile: window.innerWidth < 750
            });
        }, false);
    }

    loadEmails = () => {
        const { filterBy, sortBy } = this.state
        emailService.getEmails(filterBy, sortBy).then(emails => {
            this.setState(({ emails }), this.showFirstEmail)
        })
    }

    showFirstEmail = () => {
        let { id } = this.state.emails[0]
        id = String(id)

        history.push(`#/email/${id}/`);
    }

    onReadToggle = (emailId) => {
        emailService.toggleReadMail(emailId).then(emails => {
            this.setState({ emails })
        })
    }

    onCompose = () => {
        eventBusService.emit('toggleModal', '');
    }

    onSetFilter = (newFilterField) => {

        this.setState(prevstate => ({ filterBy: { ...prevstate.filterBy, ...newFilterField } }), this.loadEmails);
    }

    onDeleteEmail = (emailId) => {
        emailService.deleteEmail(emailId).then(email => {
            this.loadEmails()
            this.props.history.push('/email')

        })
    }

    onSendEmail = (email) => {
        emailService.addEmail(email).then(emails => {
            this.setState({ emails })
        })
    }

    onReplayEmail = (email) => {
        email.subject = 'RE: ' + email.subject
        eventBusService.emit('toggleModal', email);
    }

    toggleClass = () => {

        const currentState = this.state.displayBar;
        this.setState({ displayBar: !currentState });
    }
    // onClick={this.props.toggleClass} 

    onSetEmailType = (type) => {
        this.setState(({ filterBy: { ...type } }));
    }

    onStarEmail = (emailId) => {

        emailService.setEmailStar(emailId).then(emails => {
            this.setState({ emails })
        })
    }

    onSortBy = (sortBy) => {
        this.setState(({ sortBy: sortBy }), this.loadEmails)
    }

    onToggleMobileDetails = () => {

        this.setState({ isShowDetails: !this.state.isShowDetails })
       
    }


    render() {

        return <div className="email-app flex container">
            <button onClick={this.toggleClass} className="display-toggle-btn">☰</button>
            <button  className={`details-back-btn`}>back</button>
            <EmailSideBar onSetEmailType={this.onSetEmailType} displayBar={this.state.displayBar} toggleClass={this.toggleClass}
                onSendEmail={this.onSendEmail} onSetFilter={this.onSetFilter}
                filterBy={this.state.filterBy} onCompose={this.onCompose} />
            <div className="main-content flex">

                <EmailList isShowDetails={this.state.isShowDetails}  isMobile={this.state.isMobile} onShowMobileDetails={this.onToggleMobileDetails} onSortBy={this.onSortBy} emailType={this.state.filterBy.type} emails={this.state.emails} onReadToggle={this.onReadToggle} />

                <Router history={history}>
                    <Switch>
                        <Route render={(props) => <EmailDetails {...props}
                            onDeleteEmail={this.onDeleteEmail} isShowDetails={this.state.isShowDetails}  onStarEmail={this.onStarEmail} onReplayEmail={this.onReplayEmail} />}
                            path="/email/:id" exact></Route>
                            <Route component={EmailCompose} exact path="/email/compose" ></Route>

                    </Switch>
                </Router>
            </div>
        </div>
    }
}



