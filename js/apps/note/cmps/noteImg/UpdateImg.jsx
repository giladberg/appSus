
export default class UpdateImg extends React.Component {
    
    state = { txtInput: this.props.note.info.url}
    
    inputChange = (ev) => {
        const value = ev.target.value
        this.setState({txtInput: value })
    }

    onChangeImg=()=>{
        this.props.onChangeImg(this.props.note.id,this.state.txtInput)
    }
    
    render() {
        return  <div className="updateImg-container flex diraction-column">
           <img src={this.props.note.info.url}  alt=""/>
           <div className="flex margin-top-small">
           <input  onChange={this.inputChange} type="txt" defaultValue={this.state.txtInput}/>
           <button onClick={this.onChangeImg} className="add-btn" >add</button>
           </div>
           
        </div>
    }
}
