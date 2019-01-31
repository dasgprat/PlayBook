export default theme => ({
    header: {
        padding: 20,
        backgroundColor: theme.palette.primary.light,
        marginTop: 20,
        alignItems: 'center',
        width: '100vw',
        height: 90,
        display: 'flex',
        position: 'relative',
        [theme.breakpoints.up('sm')]: {
            justifyContent: 'center',
        }
    },
    searchBar: {
        borderRadius: 15,
        backgroundColor: 'white',
        padding: 4,
        width: 240,
        [theme.breakpoints.up('sm')]: {
            width: 400
        },
        [theme.breakpoints.up('md')]: {
            width: 500,
        },
    },
    searchInput: {
        marginLeft: 13,
        fontSize: 20
    },
    avatar: {
        position: 'absolute',
        top: '50%',
        right: '0',
        backgroundColor: '#cccccc',
        transform: 'translateY(-50%)',
        marginRight: 10,
        [theme.breakpoints.up('sm')]: {
            width: 50,
            height: 50
        },
        [theme.breakpoints.up('md')]: {
            width: 60,
            height: 60
        }
    },
    avatarLink: {
        textDecoration: 'none'
    }
});
