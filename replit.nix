{ pkgs }: {
  deps = [
    pkgs.haskellPackages.servant-multipart-client
    pkgs.python310Packages.clvm-tools
    pkgs.nodejs-16_x
  ];
}