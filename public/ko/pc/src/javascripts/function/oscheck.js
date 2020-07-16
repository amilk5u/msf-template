function oscheck(){
	var uanaVigatorOs = navigator.userAgent;
	var AgentUserOs = uanaVigatorOs.replace(/ /g, '');
	var Ostxt = "";
	var OSName = "";
	var OsVers = "";

// This script sets OSName variable as follows:
// "Windows" for all versions of Windows
// "MacOS" for all versions of Macintosh OS
// "Linux" for all versions of Linux
// "UNIX" for all other UNIX flavors
// "Unknown OS" indicates failure to detect the OS

	new function () {
		var OsNo = navigator.userAgent.toLowerCase();
		jQuery.os = {
			Linux: /linux/.test(OsNo),
			Unix: /x11/.test(OsNo),
			Mac: /mac/.test(OsNo),
			Windows: /win/.test(OsNo)
		}
	}

	function OSInfoDev() {
		//$.os.Windows
		if ($.os.Windows) {
			if (AgentUserOs.indexOf("WindowsCE") != -1) OSName = "Windows CE";
			else if (AgentUserOs.indexOf("Windows95") != -1) OSName = "Windows 95";
			else if (AgentUserOs.indexOf("Windows98") != -1) {
				if (AgentUserOs.indexOf("Win9x4.90") != -1) OSName = "Windows Millennium Edition (Windows Me)";
				else OSName = "Windows 98";
			} else if (AgentUserOs.indexOf("WindowsNT4.0") != -1) OSName = "Microsoft Windows NT 4.0";
			else if (AgentUserOs.indexOf("WindowsNT5.0") != -1) OSName = "Windows 2000";
			else if (AgentUserOs.indexOf("WindowsNT5.01") != -1) OSName = "Windows 2000, Service Pack 1 (SP1)";
			else if (AgentUserOs.indexOf("WindowsNT5.1") != -1) OSName = "Windows XP";
			else if (AgentUserOs.indexOf("WindowsNT5.2") != -1) OSName = "Windows 2003";
			else if (AgentUserOs.indexOf("WindowsNT6.0") != -1) OSName = "Windows Vista/Server 2008";
			else if (AgentUserOs.indexOf("WindowsNT6.1") != -1) OSName = "Windows 7";
			else if (AgentUserOs.indexOf("WindowsNT6.2") != -1) OSName = "Windows 8";
			else if (AgentUserOs.indexOf("WindowsNT6.3") != -1) OSName = "Windows 8.1";
			else if (AgentUserOs.indexOf("WindowsPhone8.0") != -1) OSName = "Windows Phone 8.0";
			else if (AgentUserOs.indexOf("WindowsPhoneOS7.5") != -1) OSName = "Windows Phone OS 7.5";
			else if (AgentUserOs.indexOf("Xbox") != -1) OSName = "Xbox 360";
			else if (AgentUserOs.indexOf("XboxOne") != -1) OSName = "Xbox One";
			else if (AgentUserOs.indexOf("Win16") != -1) OSName = "Windows 3.x";
			else if (AgentUserOs.indexOf("ARM") != -1) OSName = "Windows RT";
			else OSName = "Windows (Unknown)";

			if (AgentUserOs.indexOf("WOW64") != -1) OsVers = " 64-bit(s/w 32-bit)";
			else if (AgentUserOs.indexOf("Win64;x64;") != -1) OsVers = " 64-bit(s/w 64-bit)";
			else if (AgentUserOs.indexOf("Win16") != -1) OsVers = " 16-bit";
			else OsVers = " 32-bit";
		}//$.os.Windows END
		//$.os.Linux
		else if ($.os.Linux) {
			if (AgentUserOs.indexOf("Android") != -1) {
				OSName = getAndroidDevName();
			} else if (AgentUserOs.indexOf("BlackBerry9000") != -1) OSName = "BlackBerry9000";
			else if (AgentUserOs.indexOf("BlackBerry9300") != -1) OSName = "BlackBerry9300";
			else if (AgentUserOs.indexOf("BlackBerry9700") != -1) OSName = "BlackBerry9700";
			else if (AgentUserOs.indexOf("BlackBerry9780") != -1) OSName = "BlackBerry9780";
			else if (AgentUserOs.indexOf("BlackBerry9900") != -1) OSName = "BlackBerry9900";
			else if (AgentUserOs.indexOf("BlackBerry;Opera Mini") != -1) OSName = "Opera/9.80";
			else if (AgentUserOs.indexOf("Symbian/3") != -1) OSName = "Symbian OS3";
			else if (AgentUserOs.indexOf("SymbianOS/6") != -1) OSName = "Symbian OS6";
			else if (AgentUserOs.indexOf("SymbianOS/9") != -1) OSName = "Symbian OS9";
			else if (AgentUserOs.indexOf("Ubuntu") != -1) OSName = "Ubuntu";
			else if (AgentUserOs.indexOf("PDA") != -1) OSName = "PDA";
			else if (AgentUserOs.indexOf("NintendoWii") != -1) OSName = "Nintendo Wii";
			else if (AgentUserOs.indexOf("PSP") != -1) OSName = "PlayStation Portable";
			else if (AgentUserOs.indexOf("PS2;") != -1) OSName = "PlayStation 2";
			else if (AgentUserOs.indexOf("PLAYSTATION3") != -1) OSName = "PlayStation 3";
			else OSName = "Linux (Unknown)";
			if (AgentUserOs.indexOf("x86_64") != -1) OsVers = " 64-bit";
			else if (AgentUserOs.indexOf("i386") != -1) OsVers = " 32-bit";
			else if (AgentUserOs.indexOf("IA-32") != -1) OsVers = " 32-bit";
			else OsVers = "";
		}//$.os.Linux END
		//$.os.Unix
		else if ($.os.Unix) {
			OSName = "UNIX";
		}//$.os.Unix END
		//$.os.Mac
		else if ($.os.Mac) {
			if (AgentUserOs.indexOf("iPhone") != -1) {
				if (AgentUserOs.indexOf("iPhoneOS3") != -1) OSName = "iPhone OS 3";
				else if (AgentUserOs.indexOf("iPhoneOS4") != -1) OSName = "iPhone OS 4";
				else if (AgentUserOs.indexOf("iPhoneOS5") != -1) OSName = "iPhone OS 5";
				else if (AgentUserOs.indexOf("iPhoneOS6") != -1) OSName = "iPhone OS 6";
				else OSName = "iPhone";
			} else if (AgentUserOs.indexOf("iPad") != -1) {
				OSName = "iPad";
			} else if (AgentUserOs.indexOf("MacOS") != -1) {
				if (AgentUserOs.indexOf("Macintosh") != -1) OSName = "Macintosh";
				else if ((AgentUserOs.indexOf("MacOSX10_9") || AgentUserOs.indexOf("MacOSX10.1")) != -1) OSName = "Mac OS X Puma";
				else if ((AgentUserOs.indexOf("MacOSX10_9") || AgentUserOs.indexOf("MacOSX10.2")) != -1) OSName = "Mac OS X Jaguar";
				else if ((AgentUserOs.indexOf("MacOSX10_9") || AgentUserOs.indexOf("MacOSX10.3")) != -1) OSName = "Mac OS X Panther";
				else if ((AgentUserOs.indexOf("MacOSX10_9") || AgentUserOs.indexOf("MacOSX10.4")) != -1) OSName = "Mac OS X Tiger";
				else if ((AgentUserOs.indexOf("MacOSX10_9") || AgentUserOs.indexOf("MacOSX10.5")) != -1) OSName = "Mac OS X Leopard";
				else if ((AgentUserOs.indexOf("MacOSX10_9") || AgentUserOs.indexOf("MacOSX10.6")) != -1) OSName = "Mac OS X Snow Leopard";
				else if ((AgentUserOs.indexOf("MacOSX10_9") || AgentUserOs.indexOf("MacOSX10.7")) != -1) OSName = "Mac OS X Lion";
				else if ((AgentUserOs.indexOf("MacOSX10_9") || AgentUserOs.indexOf("MacOSX10.8")) != -1) OSName = "Mac OS X Mountain Lion";
				else if ((AgentUserOs.indexOf("MacOSX10_9") || AgentUserOs.indexOf("MacOSX10.9")) != -1) OSName = "Mac OS X Mavericks";
			} else {
				OSName = "MacOS (Unknown)";
			}
		}//$.os.Mac END
		//Unknown OS
		else {
			OSName = "Unknown OS";
		}
		var OSDev = OSName + OsVers;
		return OSDev;
	}

// Android의 단말 이름을 반환
	function getAndroidDevName() {
		var uaAdata = navigator.userAgent;
		var regex = /Android (.*);.*;\s*(.*)\sBuild/;
		var match = regex.exec(uaAdata);
		if (match) {
			var ver = match[1];
			var dev_name = match[2];
			return "Android " + ver + " " + dev_name;
		}
		return "Android OS";
	}

//Mobile Check
	var m_url = "https://msf.or.kr/campaigns/doctor_yerim/mo/html/main/main.html";
	getOSInfo(m_url);

//Mobile Check
	function getOSInfo(url) {
		var devName = OSInfoDev();
		if (devName.indexOf("iPhone") != -1) {
			console.log('iPhone');
			location.href = url + window.location.search;
		} else if (devName.indexOf("Android") != -1) {
			console.log('Android!!');
			location.href = url + window.location.search;
		} else {
			//console.log( devName );
		}
	}
}
