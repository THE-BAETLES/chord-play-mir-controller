export const convertPath = (outputPath: string) => {
    return (outputPath === 'input') ? outputPath.replace('input', 'output') : outputPath.replace('output', 'input');
}