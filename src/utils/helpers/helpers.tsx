export const limitDescription = (description:string, wordLimit:number) => {
    const words = description.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    } else {
      return description;
    }
  };
  