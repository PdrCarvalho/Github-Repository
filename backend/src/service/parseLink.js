export default (header) =>{
    if (header.length === 0) {
        throw new Error("input must not be of zero length");
    }

    // Split parts by comma and parse each part into a named link
    return header.split(/(?!\B"[^"]*),(?![^"]*"\B)/).reduce((links, part) => {
        const section = part.split(/(?!\B"[^"]*);(?![^"]*"\B)/);
        if (section.length < 2) {
            throw new Error("section could not be split on ';'");
        }
        const url = section[0].replace(/<(.*)>/, '$1').trim();
        const name = section[1].replace(/rel="(.*)"/, '$1').trim();

        links[name] = url;

        return links;
    }, {});
}



const teste = (linkHeader) => {
    let re = /<([^\?]+\?[a-z]+=([\d]+))>;[\s]*rel="([a-z]+)"/g;
    let arrRes = [];
    let obj = {};
    while ((arrRes = re.exec(linkHeader)) !== null) {
      obj[arrRes[3]] = {
        url: arrRes[1],
        page: arrRes[2]
      };
    }
    return obj;
  }