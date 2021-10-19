import './styles.css';

export const SearchInput = ({handleChange, value}) => ((
    <input type="search" onChange={(e) => {handleChange(e.target.value)}} value={value} placeholder="Search..."/>
));