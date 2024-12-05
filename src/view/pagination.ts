const paginationStyles = {
    pagination: {
        marginTop: 2,
        display: 'flex',
        justifyContent: 'center',
        '& .MuiPaginationItem-root': {
            borderRadius: '5px',
            backgroundColor: 'white',
            color: '#1976d2',
            border: '1px solid #1976d2',
        },
        '& .MuiPaginationItem-root.Mui-selected': {
            backgroundColor: '#1976d2',
            color: 'white',
        },
        '& .MuiPaginationItem-root:hover': {
            backgroundColor: '#e3f2fd',
        },
        '& .MuiPaginationItem-previousNext': {
            width: '45px', 
            height: '32px', 
            fontSize: '1.5rem', 
            borderRadius: '8px', 
            backgroundColor: '#ffffff',
            color: '#1976d2', 
            border: '1px solid #1976d2',  
        },
        '& .MuiPaginationItem-previousNext.Mui-selected': {
            backgroundColor: '#1976d2',
            color: 'white',
        },
        '& .MuiPaginationItem-previousNext:hover': {
            backgroundColor: '#e3f2fd', 
        },
        '& .MuiPaginationItem-ellipsis': {
            height: '32px',  
            width: '32',   
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            border: '1px solid #1976d2', 
            color: '#1976d2',
            borderRadius: '8px',
            fontSize: '1rem', 
        },
        '& .MuiPaginationItem-ellipsis:hover': {
            backgroundColor: '#e3f2fd', 
        },
    },
};

export default paginationStyles;