
export default class EmailSideNav extends React.Component {
    state = { activeLi: 1 }

    toggleClass = (id) => {
        this.setState({ activeLi: id })
    }

    onSetEmailType = (ev) => {
        const { value, id } = ev.target.dataset
        this.toggleClass(id)
        this.props.onSetFilter({ type: value })
    }

    render() {
        return <ul>
            <li onClick={this.props.onCompose}><h2 className="compose-item">Compose</h2></li>
            <li className={`${this.state.activeLi == 1 ? `activeSideItem` : ``} side-nav-item flex`} data-id={1} onClick={this.onSetEmailType} data-value="inbox"><span className="inbox-icon"></span> Inbox</li>
            <li className={`${this.state.activeLi == 2 ? `activeSideItem` : ``} side-nav-item flex`} data-id={2} onClick={this.onSetEmailType} data-value="starred"> <span className="starred-icon"></span>Starred</li>
            <li className={`${this.state.activeLi == 3 ? `activeSideItem` : ``} side-nav-item flex`} data-id={3} onClick={this.onSetEmailType} data-value="sent"><span className="sent-icon"></span> Sent</li>
            <li className={`${this.state.activeLi == 4 ? `activeSideItem` : ``} side-nav-item flex`} data-id={4} onClick={this.onSetEmailType} data-value="drafts"><span className="drafts-icon"></span> drafts</li>
        </ul>

    }

}