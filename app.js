let test_case = [];
let templates = [];
let cur_temp = null;
function createComponent(props, template, tag){
    const store = {
        IMAGE: <Image images={props.data.images} id={props.data.id}></Image>,
        ADDRESS: <Address full_address={props.data.full_address}></Address>,
        PRICE: <Price price={props.data.price}></Price>,
        AREA: <Area area={props.data.area}></Area>
    };

    if(template) {
        const childs = [];
        const childs_len = template.length;
        for (let j = 0; j < childs_len; j++) {
            const child_component = template[0].component;
            childs.push(store[child_component])
        }

        switch (tag) {
            case 'IMAGE':
                return (<Image images={props.data.images} id={props.data.id}>
                    {childs}
                </Image>);
            case 'ADDRESS':
                return (<Address full_address={props.data.full_address}>
                    {childs}
                </Address>);
            case 'PRICE':
                return (<Price price={props.data.price}>
                    {childs}
                </Price>);
            case 'AREA':
                return (<Area area={props.data.area}>
                    {childs}
                </Area>);
        }
    } else {
        return store[tag];
    }
}

axios.get('http://demo4452328.mockable.io/properties')
    .then(function (response) {
        test_case = response.data.data;

        axios.get('http://demo4452328.mockable.io/templates')
            .then(function (responseTemplates) {
                templates = responseTemplates.data;
                cur_temp = templates[2];

                createPage();
                document.getElementById('choice').addEventListener('change', function() {
                    cur_temp = templates[this.options[this.selectedIndex].value];
                    createPage();
                });
            })
            .catch(function (errorTemplates) {
                console.log(errorTemplates);
            });
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
        <div className="items">{ wrappedItems }</div>
    )
}
function Wrapper(props) {
    const result = [];

    if(templates.length > 0) {
        const template = cur_temp.template;
        for(let i = 0; i < template.length; i++){
            const component = template[i].component;
            const children = template[i].children;
            result.push(createComponent(props, children, component))
        }
    }

    return (
        <div className={'item-wrapper'}>
            <div className={'centered'}>
                { result }
            </div>
        </div>
    )
}

function Image(props) {
    return props.children ? (
        <div className="img-holder">
            <img className="item-image"
                 src={props.images[0]}
                 alt={props.id}
            />
            <div className='inner'>{props.children}</div>
        </div>) : (
        <div className="img-holder">
            <img className="item-image"
                 src={props.images[0]}
                 alt={props.id}
            />
        </div>) ;
}
function Address(props) {
    return props.children ? (
        <span className="item-address">
            { props.full_address }
            <div className='inner'>{props.children}</div>
        </span>
    ) : (
        <span className="item-address">
            { props.full_address }
        </span>
    );
}
function Area(props) {
    const info = props.area ? props.area + ' кв. ед.' : 'Не определено';

    return props.children ? (
        <span className="item-area">
            { info }
            <div className='inner'>{props.children}</div>
        </span>
    ) : (
        <span className="item-area">
            { info }
        </span>
    ) ;
}
function Price(props) {
    const str_price = props.price.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    return props.children ? (
        <span className="item-price">
            ${ str_price }
            <div className='inner'>{props.children}</div>
        </span>
    ) : (
        (
            <span className="item-price">
            { '$' + str_price }
            </span>
        )
    );
}

function createPage() {
    ReactDOM.render(
        <div>
            <App items={test_case}/>
            <select className="view-choice" id="choice" defaultValue='2'>
                <option value="0">Вариант 1</option>
                <option value="1">Вариант 2</option>
                <option value="2">Вариант 3</option>
            </select>
        </div>,
        document.getElementById('app-root')
    );
}