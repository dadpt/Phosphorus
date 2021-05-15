function decodeFsd(text: string): any {
  const fsdpackage: any = {
    command: '',
    destination: '',
    source: '',
    data: '',
  };
  const regex = /(^...)(.*?):(.*?):(.*)/gm;
  const result = regex.exec(text);
  if (result) {
    fsdpackage.command = result[1];
    fsdpackage.destination = result[2];
    fsdpackage.source = result[3];
    fsdpackage.data = result[4];
    return fsdpackage;
  }
  return null;
}
