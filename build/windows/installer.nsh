!macro customInstall
  WriteRegStr HKCU "Software\Classes\Directory\Background\shell\Alpha" "" "Open Alpha here"
  WriteRegStr HKCU "Software\Classes\Directory\Background\shell\Alpha" "Icon" "$appExe"
  WriteRegStr HKCU "Software\Classes\Directory\Background\shell\Alpha\command" "" `$appExe "%V"`

  WriteRegStr HKCU "Software\Classes\Directory\shell\Alpha" "" "Open Alpha here"
  WriteRegStr HKCU "Software\Classes\Directory\shell\Alpha" "Icon" "$appExe"
  WriteRegStr HKCU "Software\Classes\Directory\shell\Alpha\command" "" `$appExe "%V"`

  WriteRegStr HKCU "Software\Classes\Drive\shell\Alpha" "" "Open Alpha here"
  WriteRegStr HKCU "Software\Classes\Drive\shell\Alpha" "Icon" "$appExe"
  WriteRegStr HKCU "Software\Classes\Drive\shell\Alpha\command" "" `$appExe "%V"`
!macroend

!macro customUnInstall
  DeleteRegKey HKCU "Software\Classes\Directory\Background\shell\Alpha"
  DeleteRegKey HKCU "Software\Classes\Directory\shell\Alpha"
  DeleteRegKey HKCU "Software\Classes\Drive\shell\Alpha"
!macroend

!macro customInstallMode
  StrCpy $isForceCurrentInstall "1"
!macroend

!macro customInit
  IfFileExists $LOCALAPPDATA\Alpha\Update.exe 0 +2
  nsExec::Exec '"$LOCALAPPDATA\Alpha\Update.exe" --uninstall -s'
!macroend