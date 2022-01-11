export const formatName = (id: string) => {
    return id
        ?.replace(' ', '_')
        .split('_')
        .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
        .join(' ')
}
