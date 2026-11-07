{
  description = "Linux development shell for the ESP-IDF arm controller";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.11";

  outputs = { self, nixpkgs, ... }:
    let
      systems = [ "x86_64-linux" "aarch64-linux" ];
    in
    {
      packages = nixpkgs.lib.genAttrs systems (system:
        let
          pkgs = import nixpkgs { inherit system; };
          # ESP-IDF manages its own virtualenv; use a supported Python version.
          platformio = pkgs.platformio-core.override { python3Packages = pkgs.python312Packages; };
          python = platformio.python;
        in
        {
          # PlatformIO downloads upstream cross-toolchains, whose ELF loaders and
          # shared libraries expect an FHS layout, including on NixOS.
          default = pkgs.buildFHSEnv {
            name = "arm-controller-dev";
            targetPkgs = pkgs: [
              platformio
              pkgs.gcc
              pkgs.gnumake
              pkgs.cmake
              pkgs.ninja
              pkgs.pkg-config
              pkgs.git
              pkgs.libusb1
              pkgs.udev
              pkgs.zlib
              pkgs.ncurses
              pkgs.xdg-user-dirs
              python
              python.pkgs.setuptools
              python.pkgs.pip
              python.pkgs.wheel
              python.pkgs.virtualenv
            ];
            runScript = "bash";
          };
        });
      devShells = nixpkgs.lib.genAttrs systems (system: {
        default = self.packages.${system}.default.env;
      });
    };
}
