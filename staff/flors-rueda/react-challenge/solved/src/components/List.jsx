const List = ({ items, onItemClick }) => {

    return <div>
        {items.length > 0 ?
            <ol>
                {items.map((item, index) => {
                    return <li key={index}>
                        <div className="list-item">
                            {item}
                            <Btn
                                className={'delete'}
                                btnCallback={() => onItemClick(index)}
                                btnContent={'X'}
                            />
                        </div>
                    </li>
                })}
            </ol>
            :
            <p>No hay datos todavía</p>
        }

    </div>
}