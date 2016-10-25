const createCORSInstance = () => {

  const createCORSRequest = (method, url) => {
    let xhr = new XMLHttpRequest();
    if ('withCredentials' in xhr) {
      xhr.open(method, url, true);
    } else if (typeof XDomainRequest != 'undefined') {
      xhr = new XDomainRequest();
      xhr.open(method, url);
    } else {
      xhr = null;
    }
    return xhr;
  };

  class Cors {
    get(url) {
      return new Promise((resolve, reject) => {
        const xhr = createCORSRequest('GET', url);
        if (!xhr) reject('Browser not supported.');
        xhr.onload = () => {
          let response = JSON.parse(xhr.response);
          if (xhr.readyState === 4 && xhr.status === 200) resolve(response);
          else reject(xhr.responseText);
        };
        xhr.send();
      });
    }
  }

  return new Cors();
};

export default createCORSInstance().get;
