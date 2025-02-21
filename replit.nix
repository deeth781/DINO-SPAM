{ pkgs }: {
  deps = [
    pkgs.python310Packages.clvm-tools
    pkgs.nodejs-16_x
  ];
}