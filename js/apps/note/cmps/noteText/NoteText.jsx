export default class NoteText extends React.Component {
    
    componentDidMount() {
        console.log(this.props.note.type)
    }
    render() {
      
        return   <li className="note-container clean-list" >
           <div className="innerNote">{this.props.note.info.txt}</div> 
        </li>
    }
}