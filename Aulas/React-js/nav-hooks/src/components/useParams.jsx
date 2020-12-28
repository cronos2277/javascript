import {useParams} from 'react-router-dom';
export default function(props){
    const {param} = useParams();
    console.log(useParams())
    return(
        <h2>Parametro pego: {param}</h2>
    )
}