export const convertPath = (outputPath: string) => {
    return (outputPath.includes('input')) ? outputPath.replace('input', 'output') : outputPath.replace('output', 'input');
}