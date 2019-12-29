import ColorPlate from './ColorPlate.jsx'
const { Link } = ReactRouterDOM
export default class NoteTools extends React.Component {


    onDelete = (event) => {
        event.stopPropagation();
        this.props.onDelete(this.props.note.id)
    }
    onPinned = () => {
        this.props.onPinned(this.props.note.id)
    }

    onChangeColor = (color) => {
        this.props.onChangeColor(color, this.props.note.id)
    }

    render() {
        return (
            <section className={this.props.className + " flex note-tools"} >
                <div onClick={this.onPinned}
                    className={this.props.note.isPinned === true ? 'black font-awsome-pinned' : 'font-awsome-pinned'}>
                    <i className="fas fa-thumbtack"></i>
                </div>
                <div onClick={this.onDelete} className="font-awsome-delete">
                    <i className="far fa-trash-alt"></i>
                </div>
                <div className="font-awsome-color">
                    <i className="fas fa-palette"></i>
                    <div className="color-plate">
                        <ColorPlate onChangeColor={this.onChangeColor} />
                    </div>
                </div>

                <Link to={`/email/?${this.props.note.id}`}>
                    <i className="far fa-envelope"></i>
                </Link>

            </section>
        )
    }
}
