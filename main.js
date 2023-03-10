hljs.highlightAll()
        
// chatGPT
function uniqueValue(arr)
{
    let unique = 0
    for (let i = 0; i < arr.length; i++) {
        unique += arr[i] * Math.pow(256, i)
    }
    return unique
}

// chatGPT
function uniqueValue2(arr)
{
    const unique = uniqueValue(arr);
    const mapped = unique / (Math.pow(256, 4) - 1); // Map the unique value to a range between 0 and 1
    return mapped;
}

function setBG(ip)
{
    const ipl = ip.split(".")
    const main = document.querySelector("main")
    const footer = document.querySelector("footer")

    footer.style.backgroundImage = `linear-gradient(0deg, #000 90%, hsl(${uniqueValue2(ipl)}turn 50% 50%) 100%)`
    main.style.backgroundColor =  `hsl(${uniqueValue2(ipl)}turn 50% 50%)`
    document.getElementById("uniqueval").innerText = "Your unique value: " + uniqueValue(ipl)
}

if (window.localStorage.getItem("ip") == null)
{
    console.log("No localstorage data")
    let req = new XMLHttpRequest()
    req.open("GET", "https://api.ipify.org?format=json")

    req.addEventListener("readystatechange", () => {
        if (req.readyState == 4 && req.status == 200)
        {
            const response = JSON.parse(req.responseText)
            const ip = response.ip

            setBG(ip)

            window.localStorage.setItem("ip", ip)
        }
    })
    
    req.send()
}
else
{
    console.log("Localstorage data found.")
    setBG(window.localStorage.getItem("ip"))
}