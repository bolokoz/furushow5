export function useBreadcrumbs(path){

    let parts = path.split('/').filter(Boolean)
    const items = parts.map((part, index ) => {
        let href = parts.slice(0,index+1).join('/')
        return {
            title: part.toUpperCase(),
            disabled: index != parts.length - 1 ? false : true,
            href: '/' + href
        }
    })
    return items
}