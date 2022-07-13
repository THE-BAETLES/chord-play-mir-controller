export const convertPath = (outputPath: string) => {
    return (outputPath.includes('input')) ? outputPath.replace('input', 'output') : outputPath.replace('output', 'input');
}

export const getURIFromDict = (dict: {[key: string]: (string | number)}) => {
    
}