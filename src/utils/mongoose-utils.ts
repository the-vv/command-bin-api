export const idTransformer = (doc: any, ret: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
}