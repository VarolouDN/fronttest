

type PaginationProps={
    clientsPerPage:number,
    totalClients:number,
    paginate:(number:number)=>void
}

function Pagination ({ clientsPerPage, totalClients, paginate}:PaginationProps)  {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalClients / clientsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className='pagination'>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <button onClick={() => paginate(number)}  className='page-link'>
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;