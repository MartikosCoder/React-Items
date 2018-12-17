let test_case = [];

axios.get('http://demo4452328.mockable.io/properties')
    .then(function (response) {
        test_case = response.data.data;

        createPage();
    })
    .catch(function (error) {
        console.log(error);
    });

function App(props) {
    const items = props.items;
    const wrappedItems = [];

    for(let i = 0; i < items.length; i++){
        wrappedItems.push(<Wrapper key={i} data={items[i]} />);
    }

    return (
        wrappedItems
    )
}
function Wrapper(props) {
    return (
        <div className={'item-wrapper'}>
            <div className={'centered'}>
                <Image
                    images={props.data.images}
                    id={props.data.id}
                />
                <Address full_address={props.data.full_address}/>
                <Price price={props.data.price}/>
                <Area area={props.data.area}/>
            </div>
        </div>
    )
}

function Image(props) {
    return (
        <img className="item-image"
             src={props.images[0]}
             alt={props.id}
        />
    );
}
function Address(props) {
    return (
        <span className="item-address">{ props.full_address }</span>
    );
}
function Area(props) {
    const info = props.area ? props.area + ' кв. ед.' : 'Не определено';

    return (
        <span className="item-area">{ info }</span>
    );
}
function Price(props) {
    const str_price = props.price.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    return (
        <span className="item-price">${ str_price }</span>
    );
}

function createPage() {
    ReactDOM.render(
        <App items={test_case} />,
        document.getElementById('app-root')
    );
}