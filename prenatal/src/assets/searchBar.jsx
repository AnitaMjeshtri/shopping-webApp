import { MDBCol, MDBFormInline, MDBIcon } from "mdbreact";
import { Link } from "react-router-dom";


// eslint-disable-next-line react/prop-types
const SearchPage = () => {
  return (
    <>
      <MDBCol md="6" className='search'>
        <MDBFormInline className="search-form md-form flex mt-3 ml-3 mr-3 border-bottom rounded-0 border-black justify-center w-auto p-0">
            <Link to='/products/search' className="w-full"><input
            className="form-control form-control-sm border-0 rounded-0"
            type="text"
            placeholder="Search"
            aria-label="Search"

          /></Link>
        
            <MDBIcon icon="search mt-3 cursor-pointer hover:text-pink-600" 
          />
        </MDBFormInline>
      </MDBCol>
    </>
  );
};

export default SearchPage;
